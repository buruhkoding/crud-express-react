const { body } = require('express-validator')
const prisma = require('../../prisma/client')

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .bail()
        .custom(async (value) => {
            if (!value) {
                throw new Error('Email is required')
            }

            const user = await prisma.user.findUnique({ where: { email: value } })
            if (user) {
                throw new Error('Email already exists!')
            }

            return true
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]
const validateUpdateUser = [
    body('name').notEmpty().withMessage('Name is required'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .bail()
        .custom(async (value, { req }) => {

            const user = await prisma.user.findFirst({
                where: {
                    email: value,
                    id: {
                        not: parseInt(req.params.id)
                    }
                }
            })

            if (user) {
                throw new Error('Email already exists!');
            }

            return true
        }),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .custom((value, { req }) => {
            if (!req.body.passwordConfirmation) {
                throw new Error('Password confirmation is required')
            }
            return true
        }),

    body('passwordConfirmation')
        .optional()
        .custom((value, { req }) => {
            if (!req.body.password) {
                throw new Error("Password confirmation is required when password is provided");
            }

            if (req.body.password !== value) {
                throw new Error('Password confirmation does not match password')
            }
            return true
        })
]

module.exports = { validateUser, validateUpdateUser }
