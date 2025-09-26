export const GET_ALL = "SELECT * FROM Payment";
export const GET_BY_ID = "SELECT * FROM Payment WHERE Id = ?";
export const CREATE_PAYMENT = "INSERT INTO Payment ( UserId, Metode, Info ) VALUES ( ?, ?, ? )";
export const UPDATE_PAYMENT = "UPDATE Payment SET UserId = ?, Metode = ?, Info = ? WHERE Id = ?";
export const DELETE_PAYMENT = "DELETE FROM Payment WHERE Id = ?";