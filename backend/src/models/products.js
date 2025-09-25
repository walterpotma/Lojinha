export const GET_ALL = "SELECT * FROM Product";
export const GET_BY_ID = "SELECT * FROM Product WHERE Id = ?";
export const CREATE_PRODUCT = "INSERT INTO Product (Name, Description, Price, Category, Image, Stock) VALUES (?, ?, ?, ?, ?, ?)";
export const UPDATE_PRODUCT = "UPDATE Product SET Name = ?, Description = ?, Price = ?, Category = ?, Image = ?, Stock = ? WHERE Id = ?";
export const DELETE_PRODUCT = "DELETE FROM Product WHERE Id = ?";