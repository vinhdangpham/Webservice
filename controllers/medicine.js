var Medicine = require('../models/medicine');
function _getdate()
{
currentdate = new Date(); 
datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
return datetime; 
}

function _listMedicine(req, res) {
	Medicine.listMedicine(function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});
}


function _createMedicines(req, res) {
	for(var test=0;test<=10000;test++)
	{
		if(req.body["data["+test+"][Mã BD]"]!=null)
		{
			var medicine = {
				id_medicine: req.body["data["+test+"][Mã BD]"],
				name: req.body["data["+test+"][Tên biệt dược]"],
				activity: req.body["data["+test+"][Hoạt chất]"],
				unit: req.body["data["+test+"][ĐVT]"],	
				using: req.body["data["+test+"][Đường dùng]"],
				group_therapy: req.body["data["+test+"][Nhóm điều trị]"],
				category:req.body["data["+test+"][Thuộc loại]"],
				country:req.body["data["+test+"][Nước SX]"],
				number_dk:req.body["data["+test+"][Số ĐK]"],
				createdate: _getdate(),
			};
			Medicine.createMedicines(medicine, function(err, result) {});
		}
	}
}



function _selectMedicine(req, res) {
	var id = req.params.id
	Medicine.selectMedicine(id, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});
}

function _createMedicine(req, res) {
	var medicine = {
		id_medicine: req.body.id_medicine,
		name: req.body.name,
		activity: req.body.activity,
		unit:req.body.unit,
		using:req.body.using,
		number_dk:req.body.number_dk,
		group_therapy:req.body.group_therapy,
		category:req.body.category,
		country:req.body.country,
		createdate:_getdate(),
	};
	Medicine.createMedicine(medicine, function(err, result) {
		var row ={DT_RowId:result.id};
		Medicine.rowid(result.id,row,function(){});
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				id: result._id
			});
		}
	});	
}

function _updateMedicine(req, res) {
	var id = req.params.id;
	var medicine = {
		id_medicine: req.body.id_medicine,
		name: req.body.name,
		activity: req.body.activity,
		unit:req.body.unit,
		using:req.body.using,
		number_dk:req.body.number_dk,
		group_therapy:req.body.group_therapy,
		category:req.body.category,
		country:req.body.country,
		createdate:_getdate(),
	}
	Medicine.updateMedicine(id, medicine, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});
}

function _deleteMedicine(req, res) {
	var id = req.params.id;
	Medicine.deleteMedicine(id, function(err, resuft){
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1
			});
		}
	});
}

module.exports = {
	creates:_createMedicines,
	list: _listMedicine,
	select: _selectMedicine,
	create: _createMedicine,
	update: _updateMedicine,
	delete: _deleteMedicine,
};
