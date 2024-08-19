const express = require('express')
const prisma = require('../prisma/client')

const findUser =  async (req, res) => {
    try {
        const users = await prisma.findMany({
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
            messsage: "Internal server error"
        })
    }
}

module.exports = { findUser }