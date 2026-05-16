import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 100 },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 6, select: false },
  role:      { type: String, enum: ['student', 'admin'], default: 'student' },
  avatar:    { type: String, default: '' },
  bookmarks: {
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    books:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
}, { timestamps: true })

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password)
}

export default mongoose.model('User', userSchema)
