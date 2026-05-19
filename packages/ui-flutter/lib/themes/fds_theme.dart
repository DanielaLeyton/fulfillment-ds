import 'package:flutter/material.dart';
import '../tokens/brand_a_tokens.dart';
import '../tokens/brand_b_tokens.dart';

/// Builds a Material [ThemeData] from a brand token class.
/// Usage:
///   MaterialApp(theme: FdsTheme.brandA)
class FdsTheme {
  FdsTheme._();

  static ThemeData get brandA => _buildTheme(
        primary: FdsBrandATokens.colorBrandPrimary,
        onPrimary: FdsBrandATokens.colorBrandOnPrimary,
        secondary: FdsBrandATokens.colorBrandSecondary,
        onSecondary: FdsBrandATokens.colorBrandOnSecondary,
        surface: FdsBrandATokens.colorSurfaceDefault,
        surfaceVariant: FdsBrandATokens.colorSurfaceSunken,
        error: FdsBrandATokens.colorFeedbackError,
        buttonRadius: FdsBrandATokens.buttonBorderRadius,
        cardRadius: FdsBrandATokens.cardBorderRadius,
        textPrimary: FdsBrandATokens.colorTextPrimary,
        textSecondary: FdsBrandATokens.colorTextSecondary,
      );

  static ThemeData get brandB => _buildTheme(
        primary: FdsBrandBTokens.colorBrandPrimary,
        onPrimary: FdsBrandBTokens.colorBrandOnPrimary,
        secondary: FdsBrandBTokens.colorBrandSecondary,
        onSecondary: FdsBrandBTokens.colorBrandOnSecondary,
        surface: FdsBrandBTokens.colorSurfaceDefault,
        surfaceVariant: FdsBrandBTokens.colorSurfaceSunken,
        error: FdsBrandBTokens.colorFeedbackError,
        buttonRadius: FdsBrandBTokens.buttonBorderRadius,
        cardRadius: FdsBrandBTokens.cardBorderRadius,
        textPrimary: FdsBrandBTokens.colorTextPrimary,
        textSecondary: FdsBrandBTokens.colorTextSecondary,
      );

  static ThemeData _buildTheme({
    required Color primary,
    required Color onPrimary,
    required Color secondary,
    required Color onSecondary,
    required Color surface,
    required Color surfaceVariant,
    required Color error,
    required double buttonRadius,
    required double cardRadius,
    required Color textPrimary,
    required Color textSecondary,
  }) {
    final colorScheme = ColorScheme.light(
      primary: primary,
      onPrimary: onPrimary,
      secondary: secondary,
      onSecondary: onSecondary,
      surface: surface,
      surfaceContainerHighest: surfaceVariant,
      error: error,
      onError: Colors.white,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(buttonRadius),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          textStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
          elevation: 0,
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primary,
          side: BorderSide(color: primary, width: 1.5),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(buttonRadius),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          textStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
        ),
      ),

      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(cardRadius),
          side: BorderSide(color: Colors.grey.shade200),
        ),
        color: surface,
        margin: EdgeInsets.zero,
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceVariant,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.grey.shade300),
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
        ),
      ),

      textTheme: TextTheme(
        bodyLarge:  TextStyle(color: textPrimary,   fontSize: 15, height: 1.5),
        bodyMedium: TextStyle(color: textPrimary,   fontSize: 14, height: 1.5),
        bodySmall:  TextStyle(color: textSecondary, fontSize: 12, height: 1.4),
        titleLarge: TextStyle(color: textPrimary,   fontSize: 20, fontWeight: FontWeight.w700),
        titleMedium:TextStyle(color: textPrimary,   fontSize: 16, fontWeight: FontWeight.w600),
        labelMedium:TextStyle(color: textSecondary, fontSize: 12, fontWeight: FontWeight.w500, letterSpacing: 0.5),
      ),
    );
  }
}
