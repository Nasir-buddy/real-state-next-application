import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            favoriteIds,
            priceMin,
            priceMax,
            beds,
            baths,
            propertyType,
            squareFeetMin,
            squareFeetMax,
            Amenities,
            availableFrom,
            latitute,
            longitude,
        } = req.query;

        let whereConditions: Prisma.Sql[] = [];

        if (favoriteIds) {
            const favoriteIdsArray = (favoriteIds as string).split(',').map(Number);
            whereConditions.push(
                Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`
            )
        }

        if (priceMin) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
            )
        }

        if (priceMax) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
            )
        }
    } catch (error) {
        res.status(500).json({ message: `Error retrieving Manager: ${error}` })
    }
};