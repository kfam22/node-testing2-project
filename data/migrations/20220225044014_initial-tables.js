
exports.up = function(knex) {
  return knex.schema
  .createTable('roles', roles => {
      roles.increments('role_id')
      roles.string('role_name', 30).notNullable().unique()
  })
  .createTable('instructors', instructors => {
      instructors.increments('instructor_id')
      instructors.string('instructor_name')
      instructors.integer('role_id')
      .unsigned()
      .notNullable()
      .references('role_id')
      .inTable('roles')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
  })
  .createTable('students', students => {
      students.increments('student_id')
      students.string('student_name')
  })
  .createTable("classes", classes => {
      classes.increments('class_id')
      classes.string('class_name', 50).notNullable().unique()
      classes.integer('instructor_id')
      .unsigned()
      .notNullable()
      .references('instructor_id')
      .inTable('instructors')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
  })
  .createTable('s_classes', table => {
      table.increments('students_classes_id')
      table.integer('student_id')
      .unsigned()
      .notNullable()
      .references('student_id')
      .inTable('students')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
      table.integer('class_id')
      .unsigned()
      .notNullable()
      .references('class_id')
      .inTable('classes')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('classes')
  .dropTableIfExists('students')
  .dropTableIfExists('instructors')
  .dropTableIfExists('roles')
  .dropTableIfExists('s_classes')
};
