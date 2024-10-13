import { MongoClient, Db } from 'mongodb'
import { config } from 'dotenv'
config()

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(process.env.CONNECT_STRING_MG as string)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
// export default databaseService
export default databaseService
