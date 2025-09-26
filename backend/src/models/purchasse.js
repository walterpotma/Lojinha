export const GET_ALL = "SELECT * FROM Purchasse";
export const GET_BY_ID = "SELECT * FROM Purchasse WHERE Id = ?";
export const CREATE_PURCHASSE = "INSERT INTO Purchasse ( UserId, KartId, Total ) VALUES ( ?, ?, ? )";
export const UPDATE_PURCHASSE = "UPDATE Purchasse SET UserId = ?, KartId = ?, Total = ?, Status = ? WHERE Id = ?";
export const DELETE_PURCHASSE = "DELETE FROM Purchasse WHERE Id = ?";