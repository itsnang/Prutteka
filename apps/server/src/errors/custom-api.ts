class CustomAPIError extends Error {
  private errors: { status: any; name: any; message: string }[];
  constructor(message: string, statusCode: number, name: string) {
    super(message);
    this.errors = [
      {
        status: statusCode,
        name: name,
        message: message,
      },
    ];
  }
}

export { CustomAPIError };
