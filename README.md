# API-Banco-Digital (Sem banco de dados)

Será possível: 

* Cadastrar conta:
 - Nome será aceito apenas o formato string;
 - Email será aceito apenas texto que contenha " @ " e " . (após o @)" e ele é único;
 - Cpf será aceito apenas cpfs válidos e ele é único;
 - Data de aniversário no formato dd/MM/yyyy;
 - Telefone será necessário informar ddd com 02 dígitos e o telefone com 09  digitos;
 - Senha terá que conter no mínimo de 06 caracteres;;
 - Será mostrado em tela um array com todos os dados do novo cadastro;

* Atualizar Contas:
 - Nome será aceito apenas o formato string;
 - Email será aceito apenas texto que contenha " @ " e " . (após o @)" e ele é único;
 - Cpf será aceito apenas cpfs válidos e ele é único;
 - Data de aniversário no formato dd/MM/yyyy;
 - Telefone será necessário informar ddd com 02 dígitos e o telefone com 09  digitos;
 - Senha terá que conter no mínimo de 06 caracteres sendo no mínimo com 01 letra maiúscula e no mínimo 01 caractér especial;
 - Será mostrado em tela um array com todos os dados do cadastro atualizado;
 
* Listar contas:
 - Mostrará todas as contas registradas no Banco Digital;
 - Será necessário validar a operação através da senha;

* Excluir uma conta:
 - Só poderá ser feito com um número de conta válido;
 - Será necessário validar a operação através da senha;
 - O saldo tem que estar zerado para a exclusão;
 - Irá excluir a conta definitivamente do Banco Digital; 
    
* Depositar em uma conta:
 - Só poderá ser feito com um número de conta válido;
 - Será necessário informar um valor acima de 0,00;
 - Ficará registrado data (dd-MM-yyyy), número da conta e valor depositado;
 - Será mostrado em tela um array com data, número da conta e valor depositado;
    
* Sacar de uma conta:
 - Só poderá ser feito com um número de conta válido;
 - Será necessário informar um valor acima de 0,00;
 - Será necessário validar a operação através da senha;
 - O saldo tem que está acima ou igual ao valor de saque;
 - Ficará registrado data (dd-MM-yyyy), número da conta e valor do saque;
 - Será mostrado em tela um array com data, número da conta e valor do saque;
 
* Transferência entre conta dos usuários:
 - Será necessário informar: número da conta de origem, número da conta de destino, valor da transferência e password;
 - Será verificada se as contas existem;
 - Será necessário validar a operação através da senha;
 - O saldo tem que está acima ou igual ao valor da transferência;
 - Ficará registrado data (dd-MM-yyyy), número da conta de origem, valor da transferência e número da conta de destino;
 - Não retorna nada na tela;
 
*  Consultar saldo:
 - Só poderá ser feito com um número de conta válido;
 - Será necessário validar a operação através da senha;
 - Será mostrado em tela o valor total do saldo;

* Consultar extrato:
 - Só poderá ser feito com um número de conta válido;
 - Será necessário validar a operação através da senha;
 - Será monstrado em tela um array de depósito, saques e transferências realizadas;
  

Mensagens de erros serão enviadas sempre que uma requisição falhar;

Bibliotecas utilizadas: 
* Express; 
* -D nodemon ( utilizando o -D para dependência de desenvolvimento)
* Date-fns
* Joi
* Kenex
* Build
* Node
* Bcrypt
* Dotenv
* Cors