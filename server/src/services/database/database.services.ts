import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/users/users.schemas'
import Token from '~/models/schemas/tokens/tokens.schemas'
import { env } from '~/configs/environment'
import Verification from '~/models/schemas/verifications/verifications.schemas'
import PasswordReset from '~/models/schemas/password-resets/password-resets.schemas'
import Province from '~/models/schemas/provinces/provinces.schemas'
import District from '~/models/schemas/districts/districts.schemas'
import Ward from '~/models/schemas/wards/wards.schemas'
config()

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(env.DB_CONNECT as string)
    this.db = this.client.db(env.DB_NAME)
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

  get users(): Collection<User> {
    return this.db.collection(env.USERS_COLLECTION as string)
  }
  get verifications(): Collection<Verification> {
    return this.db.collection(env.VERIFICATIONS_COLLECTION as string)
  }
  get passwordResets(): Collection<PasswordReset> {
    return this.db.collection(env.PASSWORD_RESETS_COLLECTION as string)
  }
  get tokens(): Collection<Token> {
    return this.db.collection(env.TOKENS_COLLECTION as string)
  }
  get provinces(): Collection<Province> {
    return this.db.collection(env.PROVINCE_COLLECTION as string)
  }
  get districts(): Collection<District> {
    return this.db.collection(env.DISTRICT_COLLECTION as string)
  }
  get wards(): Collection<Ward> {
    return this.db.collection(env.WARD_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
