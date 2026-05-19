import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/brand_a_tokens.dart';
import '../tokens/brand_b_tokens.dart';

class FdsTheme {
  FdsTheme._();

  static ThemeData get brandA => _build(
        primary: FdsBrandATokens.colorBrandPrimary,
        onPrimary: FdsBrandATokens.colorBrandOnPrimary,
        primarySubtle: FdsBrandATokens.colorBrandPrimarySubtle,
        secondary: FdsBrandATokens.colorBrandSecondary,
        onSecondary: FdsBrandATokens.colorBrandOnSecondary,
        surface: FdsBrandATokens.colorSurfaceDefault,
        surfaceSunken: FdsBrandATokens.colorSurfaceSunken,
        surfaceEmphasis: FdsBrandATokens.colorSurfaceEmphasis,
        error: FdsBrandATokens.colorFeedbackError,
        textPrimary: FdsBrandATokens.colorTextPrimary,
        textSecondary: FdsBrandATokens.colorTextSecondary,
        textTertiary: FdsBrandATokens.colorTextTertiary,
        border: FdsBrandATokens.colorBorderDefault,
        buttonRadius: FdsBrandATokens.buttonBorderRadius,
        cardRadius: FdsBrandATokens.cardBorderRadius,
        textTheme: GoogleFonts.openSansTextTheme(),
      );

  static ThemeData get brandB => _build(
        primary: FdsBrandBTokens.colorBrandPrimary,
        onPrimary: FdsBrandBTokens.colorBrandOnPrimary,
        primarySubtle: FdsBrandBTokens.colorBrandPrimarySubtle,
        secondary: FdsBrandBTokens.colorBrandSecondary,
        onSecondary: FdsBrandBTokens.colorBrandOnSecondary,
        surface: FdsBrandBTokens.colorSurfaceDefault,
        surfaceSunken: FdsBrandBTokens.colorSurfaceSunken,
        surfaceEmphasis: FdsBrandBTokens.colorSurfaceEmphasis,
        error: FdsBrandBTokens.colorFeedbackError,
        textPrimary: FdsBrandBTokens.colorTextPrimary,
        textSecondary: FdsBrandBTokens.colorTextSecondary,
        textTertiary: FdsBrandBTokens.colorTextTertiary,
        border: FdsBrandBTokens.colorBorderDefault,
        buttonRadius: FdsBrandBTokens.buttonBorderRadius,
        cardRadius: FdsBrandBTokens.cardBorderRadius,
        textTheme: GoogleFonts.plusJakartaSansTextTheme(),
      );

  static ThemeData _build({
    required Color primary,
    required Color onPrimary,
    required Color primarySubtle,
    required Color secondary,
    required Color onSecondary,
    required Color surface,
    required Color surfaceSunken,
    required Color surfaceEmphasis,
    required Color error,
    required Color textPrimary,
    required Color textSecondary,
    required Color textTertiary,
    required Color border,
    required double buttonRadius,
    required double cardRadius,
    required TextTheme textTheme,
  }) {
    final colorScheme = ColorScheme.light(
      primary: primary,
      onPrimary: onPrimary,
      secondary: secondary,
      onSecondary: onSecondary,
      surface: surface,
      surfaceContainerHighest: surfaceSunken,
      error: error,
      onError: Colors.white,
    );

    final baseTextTheme = textTheme.apply(
      bodyColor: textPrimary,
      displayColor: textPrimary,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: surfaceSunken,
      textTheme: baseTextTheme.copyWith(
        bodyLarge:   baseTextTheme.bodyLarge?.copyWith(color: textPrimary,   fontSize: 15, height: 1.5),
        bodyMedium:  baseTextTheme.bodyMedium?.copyWith(color: textPrimary,   fontSize: 14, height: 1.5),
        bodySmall:   baseTextTheme.bodySmall?.copyWith(color: textSecondary, fontSize: 12, height: 1.4),
        titleLarge:  baseTextTheme.titleLarge?.copyWith(color: textPrimary,   fontSize: 20, fontWeight: FontWeight.w700),
        titleMedium: baseTextTheme.titleMedium?.copyWith(color: textPrimary,   fontSize: 16, fontWeight: FontWeight.w600),
        titleSmall:  baseTextTheme.titleSmall?.copyWith(color: textTertiary,  fontSize: 13, fontWeight: FontWeight.w500),
        labelMedium: baseTextTheme.labelMedium?.copyWith(color: textSecondary, fontSize: 12, fontWeight: FontWeight.w500),
        labelSmall:  baseTextTheme.labelSmall?.copyWith(color: textTertiary,  fontSize: 11, letterSpacing: 0.5),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: onPrimary,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(buttonRadius)),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          textStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
          elevation: 0,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primary,
          side: BorderSide(color: primary, width: 1.5),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(buttonRadius)),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          textStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
        ),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(cardRadius),
          side: BorderSide(color: border),
        ),
        color: surface,
        margin: EdgeInsets.zero,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceEmphasis,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: primary, width: 2),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: secondary,
        foregroundColor: onSecondary,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: onSecondary,
          fontSize: 18,
          fontWeight: FontWeight.w700,
          fontFamily: textTheme.bodyLarge?.fontFamily,
        ),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: primary,
        unselectedItemColor: textTertiary,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: surfaceEmphasis,
        labelStyle: TextStyle(color: textPrimary, fontSize: 12, fontWeight: FontWeight.w500),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        side: BorderSide.none,
      ),
      dividerTheme: DividerThemeData(color: border, thickness: 1, space: 1),
    );
  }
}
