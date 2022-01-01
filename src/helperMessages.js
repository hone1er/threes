export function publicStatusError() {
  alert(
    `The room you are trying to join is set to public. Please select the public option and try again`
  );
}

export function privateStatusError() {
  alert(
    `The room you are trying to join is set to private. Please select the private option, enter the correct password, and try again`
  );
}

export function roomNameTaken() {
  alert(
    `That room name has already been created. Join the room or start a new one with a different name`
  );
}
export function userNameTaken() {
  alert(
    `A player in the room you are joining has already used that username. Please select another usename and try again`
  );
}
export function wrongPassword() {
  alert(
    `The room you are trying to join is set to private. Please select the private option, enter the correct password, and try again`
  );
}
export function roomDoesNotExist() {
  alert(
    `There is no room by that name. Check the name and try again, or create a new room`
  );
}
