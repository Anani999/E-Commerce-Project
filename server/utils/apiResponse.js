function success(res, message='Success', data){
 res.status(200).json({success: true, message, data});
};

function serverError(res, message="Internal Server Error"){
 res.status(500).json({success: false, message});
};

function badRequest(res, message="Invalid request"){
 res.status(400).json({success: false, message});
}

function unAuthorized(res){
 res.status(401).json({success: false, message:"Unauthorized request !"});
}

export { success, serverError, badRequest, unAuthorized};
