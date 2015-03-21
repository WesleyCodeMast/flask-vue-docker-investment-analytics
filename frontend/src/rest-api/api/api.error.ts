class ApiError extends Error {
  data: object;

  status: number;

  constructor(data: object, status: number) {
    super(JSON.stringify(data));

    this.name = this.constructor.name;

    this.constructor = ApiError;
    Object.setPrototypeOf(this, ApiError.prototype);
    console.log(data);
    console.log(JSON.stringify(data));
    this.data = data;
    this.status = status;
  }
}

export default ApiError;
