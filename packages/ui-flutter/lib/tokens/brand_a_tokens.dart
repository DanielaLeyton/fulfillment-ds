// Fulfillment Design System — Brand A (Warehouse Ops)
// Sync with packages/ui-web/src/theme/tokens.ts — brandATokens

import 'package:flutter/material.dart';

class FdsBrandATokens {
  FdsBrandATokens._();

  // ── Brand colors ─────────────────────────────────────────────────────────
  static const Color colorBrandPrimary        = Color(0xFF0275EF); // Information-500
  static const Color colorBrandPrimaryHover   = Color(0xFF0255CE); // Information-600
  static const Color colorBrandPrimaryPressed = Color(0xFF013BAC); // Information-700
  static const Color colorBrandPrimarySubtle  = Color(0xFFE8F4FF); // Information-100
  static const Color colorBrandOnPrimary      = Color(0xFFFFFFFF);

  static const Color colorBrandSecondary       = Color(0xFF2D3A41); // Neutral-700
  static const Color colorBrandSecondaryHover  = Color(0xFF232D34); // Neutral-800
  static const Color colorBrandSecondarySubtle = Color(0xFFE7EBEA); // Neutral-200
  static const Color colorBrandOnSecondary     = Color(0xFFFFFFFF);

  static const Color colorBrandAccent       = Color(0xFFFBBF24); // Warning-500
  static const Color colorBrandAccentSubtle = Color(0xFFFDFBDE); // Warning-100
  static const Color colorBrandOnAccent     = Color(0xFF232D34);

  // ── Surface ──────────────────────────────────────────────────────────────
  static const Color colorSurfaceDefault  = Color(0xFFFFFFFF);
  static const Color colorSurfaceSunken   = Color(0xFFF9FBFC); // Neutral-100
  static const Color colorSurfaceEmphasis = Color(0xFFE7EBEA); // Neutral-200

  // ── Text ─────────────────────────────────────────────────────────────────
  static const Color colorTextPrimary   = Color(0xFF192126); // Neutral-900
  static const Color colorTextSecondary = Color(0xFF37474F); // Neutral-600
  static const Color colorTextTertiary  = Color(0xFF63767A); // Neutral-500
  static const Color colorTextDisabled  = Color(0xFF90A3A3); // Neutral-400
  static const Color colorTextLink      = Color(0xFF0255CE); // Information-600

  // ── Border ───────────────────────────────────────────────────────────────
  static const Color colorBorderDefault = Color(0xFFE7EBEA); // Neutral-200
  static const Color colorBorderStrong  = Color(0xFFBECBC9); // Neutral-300
  static const Color colorBorderFocus   = Color(0xFF0275EF); // Information-500

  // ── Feedback ─────────────────────────────────────────────────────────────
  static const Color colorFeedbackSuccess       = Color(0xFF047E48); // Success-500
  static const Color colorFeedbackSuccessSubtle = Color(0xFFE8F6EE); // Success-100
  static const Color colorFeedbackWarning       = Color(0xFFFBBF24); // Warning-500
  static const Color colorFeedbackWarningSubtle = Color(0xFFFDFBDE); // Warning-100
  static const Color colorFeedbackError         = Color(0xFFD72A22); // Error-500
  static const Color colorFeedbackErrorSubtle   = Color(0xFFFFF2F2); // Error-100

  // ── Component tokens ─────────────────────────────────────────────────────
  static const double buttonBorderRadius = 6.0;
  static const double cardBorderRadius   = 10.0;
  static const double inputHeight        = 40.0;

  // ── Spacing ──────────────────────────────────────────────────────────────
  static const double spacing1  = 4.0;
  static const double spacing2  = 8.0;
  static const double spacing3  = 12.0;
  static const double spacing4  = 16.0;
  static const double spacing6  = 24.0;
  static const double spacing8  = 32.0;
  static const double spacing10 = 40.0;
  static const double spacing12 = 48.0;

  // ── Typography ───────────────────────────────────────────────────────────
  static const String fontFamily = 'OpenSans';

  static const double fontSizeXs  = 11.0;
  static const double fontSizeSm  = 13.0;
  static const double fontSizeMd  = 15.0;
  static const double fontSizeLg  = 17.0;
  static const double fontSizeXl  = 20.0;
  static const double fontSize2xl = 24.0;
  static const double fontSize3xl = 30.0;

  static const FontWeight fontWeightRegular  = FontWeight.w400;
  static const FontWeight fontWeightMedium   = FontWeight.w500;
  static const FontWeight fontWeightSemibold = FontWeight.w600;
  static const FontWeight fontWeightBold     = FontWeight.w700;
}
