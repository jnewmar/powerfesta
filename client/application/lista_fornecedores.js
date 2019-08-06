Template.lista_fornecedores.helpers({
	getListaFornecedores: function(tp) {
		


		fornec=Meteor.users.find({ roles : { $in: ["FORNECEDOR"] } }, {sort : {createdAt: -1}})

		


	  	return fornec;
  	},
 });