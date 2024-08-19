const express = require('express')
const prisma = require('../prisma/client')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const findUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                id: "desc"
            }
        })

        res.status(200).send({
            success: true,
            message: "Get all users",
            data: users
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            messsage: error.message
        })
    }
}

const createUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation errors",
            errors: errors.array()
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        res.status(201).send({
            status: true,
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

const findUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).send({
            status: true,
            message: `Get user by ID: ${id}`,
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const existingUser = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!existingUser) {
        return res.status(400).json({
            status: false,
            message: "User not found",
        });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })


        const { password, ...dataWithoutPassword} = user

        return res.status(200).json({
            status: true,
            message: "User update successfully",
            data: dataWithoutPassword
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = { findUsers, createUser, findUserById, updateUser }
