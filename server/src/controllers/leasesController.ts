import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLeases = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const leases = await prisma.lease.findMany({
            include: {
                property: true,
                tenant: true,
            }
        });
        if (leases) {
            res.json(leases);
        } else {
            res.status(404).json({ message: "Leases not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error retrieving Leases: ${error}` })
    }
};

export const getLeasePayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payments = await prisma.payment.findMany({
            where: {
                leaseId: Number(id)
            }
        });
        if (payments) {
            res.json(payments);
        } else {
            res.status(404).json({ message: "Lease Payments not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error retrieving Lease Payments: ${error}` })
    }
};