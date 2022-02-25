const db = require('../../data/db-config');


function getAll() {
    return db('roles')
}

function getById(role_id) {
    return db('roles').where('role_id', role_id).first()
}

async function insert(role) {
    const [role_id] = await db('roles').insert(role);
    return getById(role_id);
}

async function update(role_id, changes) {
    await db('roles')
      .update({ role_name: changes.role_name })
      .where('role_id', role_id); 
    return getById(role_id);
  }
  
  async function remove(role_id) {
    const result = await getById(role_id);
    await db('roles')
      .where('role_id', role_id)
      .del();

      return result;
  }





module.exports = {
    insert,
    update,
    remove,
    getAll,
    getById
}