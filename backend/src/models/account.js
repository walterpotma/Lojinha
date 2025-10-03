export const GET_ALL = "SELECT * FROM User";
export const GET_BY_ID = "SELECT * FROM User WHERE Id = ?";
export const CREATE_USER = "INSERT INTO User (Name, Email, Phone, Password, Image, Active) VALUES (?, ?, ?, ?, ?, ?)";
export const UPDATE_USER = "UPDATE User SET Name = ?, Phone = ?, Password = ?, Image = ? WHERE Id = ?";
export const DELETE_USER = "DELETE FROM User WHERE Id = ?";
export const LOGIN = "SELECT * FROM User WHERE Email = ?";