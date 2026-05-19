import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class ScanScreen extends StatefulWidget {
  const ScanScreen({super.key});

  @override
  State<ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  final _controller = TextEditingController();
  String? _scanned;
  bool _found = false;

  void _simulate() {
    setState(() {
      _scanned = 'SKU-00192';
      _found = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(title: const Text('Escanear SKU')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Scanner viewfinder mock
            Container(
              height: 220,
              decoration: BoxDecoration(
                color: const Color(0xFF192126),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Icon(Icons.qr_code_scanner, size: 80, color: cs.primary.withOpacity(0.8)),
                  Positioned(top: 20, left: 20, child: _Corner(cs.primary, top: true, left: true)),
                  Positioned(top: 20, right: 20, child: _Corner(cs.primary, top: true, left: false)),
                  Positioned(bottom: 20, left: 20, child: _Corner(cs.primary, top: false, left: true)),
                  Positioned(bottom: 20, right: 20, child: _Corner(cs.primary, top: false, left: false)),
                  Positioned(
                    bottom: 14,
                    child: Text('Apunta la cámara al código', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Manual input
            TextField(
              controller: _controller,
              decoration: const InputDecoration(
                labelText: 'Ingreso manual de SKU',
                prefixIcon: Icon(Icons.search),
                hintText: 'Ej: SKU-00192',
              ),
            ),
            const SizedBox(height: 12),
            FdsButton(label: 'Simular escaneo', fullWidth: true, leadingIcon: const Icon(Icons.qr_code), onPressed: _simulate),
            const SizedBox(height: 24),

            // Result
            if (_scanned != null)
              AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: _found ? const Color(0xFFE8F6EE) : const Color(0xFFFFF2F2),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: _found ? const Color(0xFF047E48) : const Color(0xFFD72A22)),
                ),
                child: Row(
                  children: [
                    Icon(_found ? Icons.check_circle : Icons.error_outline,
                        color: _found ? const Color(0xFF047E48) : const Color(0xFFD72A22)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(_scanned!, style: theme.textTheme.titleMedium),
                          Text(_found ? 'Encontrado · Caja mediana × 3 · Zona A' : 'SKU no encontrado en inventario',
                              style: theme.textTheme.bodySmall),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

            if (_found) ...[
              const SizedBox(height: 16),
              FdsButton(label: 'Confirmar pickeo', fullWidth: true, size: FdsButtonSize.lg, onPressed: () {
                setState(() { _scanned = null; _found = false; });
              }),
              const SizedBox(height: 8),
              FdsButton(label: 'Reportar incidencia', variant: FdsButtonVariant.danger, fullWidth: true, onPressed: () {}),
            ],
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class _Corner extends StatelessWidget {
  const _Corner(this.color, {required this.top, required this.left});
  final Color color;
  final bool top;
  final bool left;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 24,
      height: 24,
      child: CustomPaint(painter: _CornerPainter(color, top: top, left: left)),
    );
  }
}

class _CornerPainter extends CustomPainter {
  const _CornerPainter(this.color, {required this.top, required this.left});
  final Color color;
  final bool top;
  final bool left;

  @override
  void paint(Canvas canvas, Size size) {
    final p = Paint()..color = color..strokeWidth = 3..style = PaintingStyle.stroke..strokeCap = StrokeCap.round;
    final x = left ? 0.0 : size.width;
    final y = top ? 0.0 : size.height;
    final dx = left ? size.width : -size.width;
    final dy = top ? size.height : -size.height;
    canvas.drawLine(Offset(x, y), Offset(x + dx, y), p);
    canvas.drawLine(Offset(x, y), Offset(x, y + dy), p);
  }

  @override
  bool shouldRepaint(_) => false;
}
