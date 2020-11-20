import { InvalidConfigFileError, UndefinedConfigGroup } from "./errors.ts";

// eslint-disable-next-line ban-types
type NO = object;

async function _importConfigFile(name?: string): Promise<NO> {
  if (typeof name === 'undefined') {
    return {};
  }

  try {
    const path = `${ Deno.env.get('PWD') }/config/${ name }.ts`;

    const module = await import(path);

    const { ['default']: defaultExport } = module;
    
    if (typeof defaultExport !== 'object' || defaultExport === null) {
      throw new InvalidConfigFileError(name);
    }

    return defaultExport;
  } catch (error) {
    return {};
  }
}

async function _initConfig(): Promise<NO> {
  if (typeof _config === 'object' && _config !== null) {
    return _config;
  }

  const env = Deno.env.get('NODE_ENV');

  const defaultConfig = await _importConfigFile('default');
  const envConfig = await _importConfigFile(env);

  // TODO(roman): use deep merge instead of THIS
  _config = { ...defaultConfig, ...envConfig };

  return _config;
}

const _secret = Symbol('config-secret');
let _config: NO;

export class Config<Groups extends NO> {
  private data!: Groups;

  constructor(secret: symbol) {
    if (secret !== _secret) {
      throw new Error('CONSTRUCTOR_DISABLED');
    }
  }

  static async fromFS<T extends NO>(): Promise<Config<T>> {
    const result = new Config<T>(_secret);
    
    // eslint-disable-next-line no-explicit-any
    result.data = await _initConfig() as any;

    return result;
  }

  get<N extends keyof Groups>(name: N): Groups[N] {
    const value = this.data[name];

    if (typeof value === 'undefined') {
      throw new UndefinedConfigGroup(name as string);
    }

    return this.data[name];
  }
}
