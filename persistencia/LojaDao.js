function LojaDao(connection) {
    this._connection = connection;
}

LojaDao.prototype.salva = function (loja, callback) {
    this._connection.query('INSERT INTO lojas SET ?', loja, callback);
}

LojaDao.prototype.altera = function (loja, callback) {
    this._connection.query('update lojas SET nome_loja = ?, endereco = ? , celular = ?, cnpj = ?, horarioDeTrabalho = ?, cidade = ?, estado = ? where id =? ',
        [loja.nome_loja, loja.endereco, loja.celular, loja.cnpj, loja.horarioDeTrabalho, loja.cidade, loja.estado, loja.id], callback);
}

LojaDao.prototype.deleta = function (id,callback) {
    this._connection.query('delete from lojas where id=?',[id], callback);
}

LojaDao.prototype.buscaPorId = function (id, callback) {
    this._connection.query('select * from lojas where id = ?', [id], callback);
}

LojaDao.prototype.BuscaEstado = function (estado, callback) {
    this._connection.query('select * from lojas where estado = ?', [estado], callback);
}

LojaDao.prototype.listaTodos = function (callback) {
    this._connection.query('select * from lojas', callback);
}

LojaDao.prototype.buscaEstadoEUmaCidade = function (estado, cidadeA, callback) {
    this._connection.query('select * from lojas where estado = ? && cidade = ?', [estado, cidadeA], callback);
}

LojaDao.prototype.buscaEstadoEDuasCidades = function (estado, cidadeA, cidadeB, callback) {
    this._connection.query('select * from lojas where (cidade = ? || cidade = ?) && estado = ?', [cidadeA, cidadeB, estado], callback)
}

LojaDao.prototype.buscaEstadoETresCidades = function (estado, cidadeA, cidadeB, cidadeC, callback) {
    this._connection.query('select * from lojas where (cidade = ? || cidade = ? || cidade = ?) && estado = ?', [cidadeA, cidadeB, cidadeC, estado], callback)
}


module.exports = function () {
    return LojaDao;
};