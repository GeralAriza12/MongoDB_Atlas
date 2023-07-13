#¿Qué es mi producto y para que sirve?

    En los documentos creados pude desarrollar la estructura de los campos que tendrá cada documento para mi base de datos que se vería de esta manera en cada documento o tarea nueva que creemos
        {
        Id: 1,
        task: “ “ ,                              
        description: “ “,        
        priority:   1,                    
        completed:  false
        }
    Esto nos ayuda a evidenciar la estructura y manejo de datos que podemos tener en cada collection

    Mi producto usa Node.js se utiliza para enrutar las solicitudes HTTP y en cada solicitud puedo enviar información a mongoAtlas, en esta proyecto se creo una base de datos llamada 'todo_list' con 3 collections 'home-task', 'study-task' y 'work-task', estas rutas nos ayuda a tener un control de cada proceso CRUD que querramos realizar a una ruta específica con una función de devolución de llamada.

#¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?

    Mi producto tiene funcionalidades como:
    Operaciones CRUD:
        Create
            db.HomeTask.insertOne({ })
            db.StudyTask.insertMany([{ }])
        Read
            db.HomeTask.find().toArray()
            db.StudyTask.find({"": {$eq: }})
        Update
            db.HomeTask.updateOne({_id: ObjectId("") },{$set:{"": ""}})
            db.StudyTask.updateMany({"": { $eq:  }}, { $set: {"": } })
        Delete
            db.HomeTask.deleteOne({_id: ObjectId("")})
            db.StudyTask.deleteMany( {"": } )
    Son algunas de las operaciones que recibe a través de la consola de Mongo, estas funcionalidades son importantes ya que son comandos los cuales me permite crear, leer, actualizar y/o eliminar los datos que existen en mi base de datos, esto hace que los usuarios lo usen ya que es dinameco y funcional para sus diversos documentos que quiera crear con este producto.



