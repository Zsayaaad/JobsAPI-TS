class CustomAPIError extends Error {
  code: number;
  keyValue: any;
  errors: any;
  value: any;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default CustomAPIError;
