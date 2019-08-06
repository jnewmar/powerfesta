
Template.cad_fornecedor.rendered = function(){
	this.autorun(function () {});
};	



Template.cad_fornecedor.helpers = function(){
}	


Template.cad_fornecedor.events({	
  'submit #formCadastrarFornecedor': function(e,t) {
    e.preventDefault();

    	arr_fornecedor_tipos=[];
    	if( document.getElementById('servicos_fornecidos_local').checked ){
			arr_fornecedor_tipos.push("LOCAL");
		}		
		if( document.getElementById('servicos_fornecidos_salgados').checked ){
			arr_fornecedor_tipos.push("SALGADOS");
		}
		if( document.getElementById('servicos_fornecidos_doces').checked ){
			arr_fornecedor_tipos.push("DOCES");
		}
		if( document.getElementById('servicos_fornecidos_bolo').checked ){
			arr_fornecedor_tipos.push("BOLO");
		}
		if( document.getElementById('servicos_fornecidos_animacao').checked ){
			arr_fornecedor_tipos.push("ANIMACAO");
		}
		if( document.getElementById('servicos_fornecidos_decoracao').checked ){
			arr_fornecedor_tipos.push("DECORACAO");
		}
	//	if( document.getElementById('servicos_fornecidos_outros').checked ){
	//		arr_fornecedor_tipos.push("OUTROS");
//		}

	
		user={
	      email: document.getElementById('email_contato').value,
	      password: document.getElementById('senha').value ,
	      profile: { name: document.getElementById('nome_contato').value ,
	      			email: document.getElementById('email_contato').value,
	      			telefone: document.getElementById('telefone_contato').value,
	      			cep: document.getElementById('cep_contato').value,
	      			data_cadastro: new Date()
	      			}
	    }





		console.log("user "+JSON.stringify(user));	

		Meteor.call("criaFornecedor", user, function(err,result){
			console.log("Resultado Criando Usuario "+JSON.stringify(result));							
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar criar usuario "+JSON.stringify(err));	
	        }
	        else{
	        	

		        Meteor.loginWithPassword(document.getElementById('email_contato').value, user.password, function(errLogin){
			        if (errLogin){
			        	alert("Erro: "+errLogin.message);
						console.log("Erros ao tentar logar com usuario criado "+JSON.stringify(errLogin));	
			        }
			        else{
			          	console.log("Logou com sucesso");
						console.log("user "+JSON.stringify(Meteor.user()));	    
						id_fornecedor=Meteor.userId();
						u=Meteor.user();
						console.log("id user "+id_fornecedor+" | "+Meteor.userId());  




						console.log("Serviços do fornecedor a cadastrar "+JSON.stringify(arr_fornecedor_tipos));
			        	for (i = 0; i <arr_fornecedor_tipos.length; i++) { 
					    	fs= {
					    		id_fornecedor: id_fornecedor ,
					    		tipo : arr_fornecedor_tipos[i],
					    		data_cadastro: new Date()
					    	};
					    	console.log("cadastrar "+JSON.stringify(fs));	
					    	Meteor.call("addFornecedorServico", fs, function(err,result){
								console.log("Resultado  "+JSON.stringify(result));									
							});
						}	




						Router.go('fornecedor_cadastrado', {_id: result});
					}	
		     	});			
			}
		});
		
	}

});


