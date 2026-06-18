import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documents: DocumentsService) {}

  /**
   * Required-document checklist for a given role (CLIENT | VENDOR).
   * The onboarding + admin verification UIs read this so the document
   * catalogue stays consistent with what is stored in Firestore.
   */
  @Get('required/:role')
  getRequiredDocuments(@Param('role') role: string) {
    return this.documents.getRequiredDocuments(role);
  }

  /**
   * Download a standardised, blank vendor price-sheet template (CSV / Excel).
   * Always available even when an admin has not uploaded a custom sheet.
   */
  @Get('templates/price-sheet')
  downloadPriceSheetTemplate(
    @Res() res: Response,
    @Query('title') title?: string,
  ) {
    const { fileName, content } = this.documents.buildPriceSheetTemplateCsv({
      title,
    });
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    // Prepend BOM so Excel detects UTF-8 correctly.
    res.send('\uFEFF' + content);
  }
}
