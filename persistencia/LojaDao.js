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

LojaDao.prototype.buscaEstadoECidade = function (estado, cidade, callback) {
    this._connection.query('select * from lojas where estado = ? && cidade = ?',[estado, cidade], callback);
}



module.exports = function () {
    return LojaDao;
};