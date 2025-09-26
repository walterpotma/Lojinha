export const GET_ALL = "SELECT * FROM Kart";
export const GET_BY_ID = "SELECT * FROM Kart WHERE Id = ?";
export const CREATE_KART = "INSERT INTO Kart ( UserId, ProductId, Quantity ) VALUES ( ?, ?, ? )";
export const UPDATE_KART = "UPDATE Kart SET UserId = ?, ProductId = ?, Quantity = ? WHERE Id = ?";
export const DELETE_KART = "DELETE FROM Kart WHERE Id = ?";