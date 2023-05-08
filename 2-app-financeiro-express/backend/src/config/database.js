const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.Error.messages.general.required = 'O atributo --{PATH} é obrigatório';
mongoose.Error.messages.Number.min =
    'O valor --{VALUE} informado é menor que o limite de --{MIN}';
mongoose.Error.messages.Number.max =
    'O valor --{VALUE} informado é maior que o limite de --{MAX}';

module.exports = mongoose.connect('mongodb://localhost/financeiro');
