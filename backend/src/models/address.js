export const GET_BY_ID = "SELECT * FROM Address WHERE UserId = ?";
export const CREATE_ADDRESS = "INSERT INTO Address ( UserId, Street, Number, Complement, District, City, State ) VALUES ( ?, ?, ?, ?, ?, ?, ? )";
export const UPDATE_ADDRESS = "UPDATE Address SET Street = ?, Number = ?, Complement = ?, District = ?, City = ?, State = ? WHERE Id = ?";
export const DELETE_ADDRESS = "DELETE FROM Address WHERE Id = ?";