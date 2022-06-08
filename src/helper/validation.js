export const validate=(cinputs={}, validations={}) =>{
    let cerrors={};
    Object.keys(validations).forEach(function(ckey) {
        var validations_list=validations[ckey]?validations[ckey].split('|'):[];
        validations_list.map(function(value,key){
            switch(value){
                case "required":
                    if(cinputs[ckey]==undefined || cinputs[ckey]==''){
                        cerrors={...cerrors,  [ckey]: 'its required field' };
                    }
                break
                case "confirm_password":
                    if(cinputs[ckey]!=undefined 
                        && cinputs[ckey]!='' 
                        && (cinputs.confirm_password==undefined ||  cinputs[ckey]!=cinputs.confirm_password)){
                        cerrors={ ...cerrors, 'confirm_password': 'Password not matached' };
                    }
            }

        })

        }) 

    return cerrors;
}