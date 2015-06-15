var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicine = new Schema({
	id_medicine: String,
	name: String,
	activity: String,
	unit:String,
	using:String,
	number_dk:String,
	group_therapy:String,
	category:String,
	country:String,
	DT_RowId:String,
	createdate:String
});

var Medicine = mongoose.model('Medicine', medicine);
function _listMedicine(callback) {
	Medicine.find().exec(function(err, medicine) {
		callback(err, medicine);
	});
}

function _selectMedicine(id, callback) {
	Medicine.find({'_id': id}).exec(function(err, medicine){
		callback(err, medicine);
	});
}
function _createMedicines(u, callback) {
  medicine = new Medicine(u);
  Medicine.create(medicine,function(err){
    if(err)
    {
        throw"Can not create new medicine";
    }
    else
    {
      for (var i=1; i<arguments.length; ++i) {
        var candy = arguments[i];
        Medicine.update({'_id':candy._id},{DT_RowId:candy._id},function(){});
    }
    }
  })
}

function _createMedicine(u, callback) {
	medicine = new Medicine(u);
	medicine.save(function(err, result) {
		if (err) {
			throw "Can not create new medicine";
		}
		else {
			if (typeof callback == "function") {
				callback(false, result);
				}
			}
		});
}
function _Rowid(id,u,callback){
  Medicine.update({'_id':id},u,function(){});
}

function _updateMedicine(id, u ,callback) {
	Medicine.update({'_id': id}, u, function(err, result){
		if (err) {
			throw "Can not update new medicine";
		}
		else {
			if (typeof callback == "function") {
				callback(false, result);
			}
		}
	});
}

function _deleteMedicine(id, callback) {
	var res=[];
 	res= id.split(",");
  	for (var index in res) {
    if(index==0)
    {
        Medicine.remove({'_id':res[index]},function(err,result){
        if(err)
        {
         throw"Can not delete medicine";
        }
        else if (typeof callback == "function") {
         callback(false, result);
        }
      });
    }
    else {
      Medicine.remove({'_id':res[index]},function(err,medicine){
      });
    }
  }
}

module.exports = {
	listMedicine:_listMedicine,
	selectMedicine:_selectMedicine,
	createMedicine:_createMedicine,
	updateMedicine:_updateMedicine,
	createMedicines:_createMedicines,
	deleteMedicine:_deleteMedicine
};