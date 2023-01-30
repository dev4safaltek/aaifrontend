export enum StatusCode {
  LoginSucess = 1,
  InvalidUserIDPassword = 2,
  InvalidLoginHours = 3,
  InvalidIPRange = 4,
  NoIPRestrictionLoginAllowed = 5,
  UserPermanentLockedOut = 6,
  UserNameDoesNotExists = 7,
  InActiveUser = 8,
  LinkNotFound = 9,
  LinkExpired = 10,
  EnterUniquePassword = 11,
  PasswordUpdatedSuccessFully = 12,
  VisitGmailForResetPasswordLink = 13,
  LinkSuccessFullySent = 14,
  OK = 15,
  UserNameAlreadyExist = 16,
  UserAccountTemporarilylocked = 17,
  Error = 18,
  InValidProcessRequest = 19,
  PasswordOrPINNotCorrect = 20,
  ContactAdminToSetPasswordOrPIN = 21,
  ElectronicallySignedSuccess = 22,
  Sucess = 200,
  NoContent=204,
  IncorrectPin =23,
  ChildIsNotExist=24,
  FileLimitCross=25
}
