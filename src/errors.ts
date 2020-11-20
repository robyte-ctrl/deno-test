export class BasicError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export class InvalidConfigFileError extends BasicError {
  constructor(public path: string) {
    super('INVALID_CONFIG_FILE', `no object is exported from config file at '${ path }'`);
  }
}

export class UndefinedConfigGroup extends BasicError {
  constructor(public name: string) {
    super('UNDEFINED_CONFIG_GROUP', `'${ name } is not defined in any config files`);
  }
}