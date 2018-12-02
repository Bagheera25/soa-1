export class FormValidationPatterns {

    static PasswordValidationPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    static EmailValidationPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

    static NumberValidationPatter = /^(0|[1-9][0-9]*)$/;

}
