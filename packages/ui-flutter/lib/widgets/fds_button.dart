import 'package:flutter/material.dart';

enum FdsButtonVariant { primary, secondary, ghost, danger }
enum FdsButtonSize { sm, md, lg }

class FdsButton extends StatelessWidget {
  const FdsButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = FdsButtonVariant.primary,
    this.size = FdsButtonSize.md,
    this.loading = false,
    this.fullWidth = false,
    this.leadingIcon,
  });

  final String label;
  final VoidCallback? onPressed;
  final FdsButtonVariant variant;
  final FdsButtonSize size;
  final bool loading;
  final bool fullWidth;
  final Widget? leadingIcon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    final padding = switch (size) {
      FdsButtonSize.sm => const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      FdsButtonSize.md => const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      FdsButtonSize.lg => const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
    };

    final fontSize = switch (size) {
      FdsButtonSize.sm => 13.0,
      FdsButtonSize.md => 14.0,
      FdsButtonSize.lg => 16.0,
    };

    final (bg, fg, border) = switch (variant) {
      FdsButtonVariant.primary   => (cs.primary,   cs.onPrimary,   BorderSide.none),
      FdsButtonVariant.secondary => (cs.secondary, cs.onSecondary, BorderSide.none),
      FdsButtonVariant.ghost     => (Colors.transparent, cs.primary, BorderSide(color: cs.primary, width: 1.5)),
      FdsButtonVariant.danger    => (cs.error,     cs.onError,     BorderSide.none),
    };

    final shape = RoundedRectangleBorder(
      borderRadius: theme.elevatedButtonTheme.style?.shape
              ?.resolve({})
              ?.let((s) => (s as RoundedRectangleBorder).borderRadius) ??
          BorderRadius.circular(8),
      side: border,
    );

    final child = loading
        ? SizedBox(
            width: fontSize,
            height: fontSize,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation(fg),
            ),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (leadingIcon != null) ...[
                IconTheme(data: IconThemeData(color: fg, size: fontSize + 2), child: leadingIcon!),
                const SizedBox(width: 8),
              ],
              Text(
                label,
                style: TextStyle(
                  color: fg,
                  fontSize: fontSize,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          );

    final button = ElevatedButton(
      onPressed: loading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: bg,
        foregroundColor: fg,
        padding: padding,
        shape: shape,
        elevation: 0,
      ),
      child: child,
    );

    return fullWidth ? SizedBox(width: double.infinity, child: button) : button;
  }
}

extension _Let<T> on T {
  R let<R>(R Function(T) block) => block(this);
}
