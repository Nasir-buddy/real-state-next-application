import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listApplications = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, userType } = req.query;
        let whereClause = {};
        if(userId && userType){
            if(userType === 'tenant'){
                whereClause = {
                    tenantCognitoId: String(userId)
                }
            } else if(userType === 'manager'){
                whereClause = {
                    property: {
                        managerCognitoId: String(userId)
                    }
                }
            }
        }
        const applications = await prisma.application.findMany({
            where: whereClause,
            include: {
                property: {
                    include: {
                        location: true,
                        manager: true,
                    }
                },
                tenant: true
            }
        });
        if(applications){
            res.json(applications);
        } else {
            res.status(404).json({ message: "Applications not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error retrieving Applications: ${error}` })
    }
};

export const getApplication = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error) {
        res.status(500).json({ message: `Error retrieving Application: ${error}` })
    }
};