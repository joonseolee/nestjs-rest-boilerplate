export class CreateStudentDto {
  constructor(
    public name: string,
    public sex: boolean,
    public phoneNumber: string,
  ) {}
}
