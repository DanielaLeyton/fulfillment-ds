import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class DeliveryProfileScreen extends StatelessWidget {
  const DeliveryProfileScreen({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  static const primary = Color(0xFF0A8920);
  static const secondary = Color(0xFF2D3A41);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF9FBFC),
      appBar: AppBar(backgroundColor: secondary, foregroundColor: Colors.white, title: const Text('Perfil')),
      body: SingleChildScrollView(
        child: Column(children: [
          // Header
          Container(
            width: double.infinity,
            color: secondary,
            padding: const EdgeInsets.symmetric(vertical: 28),
            child: Column(children: [
              // Jumbo-style location chip
              Container(
                margin: const EdgeInsets.only(bottom: 16),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                decoration: BoxDecoration(
                  color: primary.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(9999),
                ),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  const Icon(Icons.location_on, color: Colors.white, size: 12),
                  const SizedBox(width: 4),
                  const Text('Jumbo Portal La Dehesa', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600)),
                  const Icon(Icons.keyboard_arrow_down, color: Colors.white, size: 14),
                ]),
              ),
              CircleAvatar(
                radius: 34,
                backgroundColor: primary,
                child: const Text('ML', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
              ),
              const SizedBox(height: 10),
              const Text('Miguel López', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text('Repartidor · Zona Norte', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 13)),
            ]),
          ),

          // Daily summary card
          Padding(
            padding: const EdgeInsets.all(16),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFE7EBEA)),
              ),
              padding: const EdgeInsets.all(16),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text('Resumen de hoy', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Color(0xFF192126))),
                const SizedBox(height: 12),
                Row(children: [
                  Expanded(child: _Metric('Entregados', '8', primary)),
                  Expanded(child: _Metric('Pendientes', '4', const Color(0xFFFBBF24))),
                  Expanded(child: _Metric('Km', '32', const Color(0xFF63767A))),
                ]),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 8 / 12,
                    minHeight: 7,
                    backgroundColor: const Color(0xFFE7EBEA),
                    valueColor: const AlwaysStoppedAnimation(primary),
                  ),
                ),
                const SizedBox(height: 4),
                const Text('8 de 12 entregas (66%)', style: TextStyle(fontSize: 11, color: Color(0xFF63767A))),
              ]),
            ),
          ),

          _MenuItem(Icons.history, 'Historial de entregas', () {}),
          _MenuItem(Icons.star_outline, 'Mis calificaciones', () {}),
          _MenuItem(Icons.account_balance_wallet_outlined, 'Ganancias', () {}),
          _MenuItem(Icons.directions_car_outlined, 'Mi vehículo', () {}),
          _MenuItem(Icons.help_outline, 'Soporte Jumbo', () {}),
          const Divider(),

          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Design System', style: theme.textTheme.titleSmall),
              const SizedBox(height: 4),
              const Text('Brand B — Last Mile (Jumbo)', style: TextStyle(fontSize: 12, color: Color(0xFF63767A))),
              const SizedBox(height: 12),
              FdsButton(
                label: 'Cambiar a Brand A (Shipping)',
                variant: FdsButtonVariant.especial,
                fullWidth: true,
                leadingIcon: const Icon(Icons.swap_horiz),
                onPressed: onSwitchBrand,
              ),
            ]),
          ),
        ]),
      ),
    );
  }
}

class _Metric extends StatelessWidget {
  const _Metric(this.label, this.value, this.color);
  final String label, value;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text(value, style: TextStyle(color: color, fontSize: 20, fontWeight: FontWeight.w800)),
      Text(label, style: const TextStyle(fontSize: 11, color: Color(0xFF63767A)), textAlign: TextAlign.center),
    ]);
  }
}

class _MenuItem extends StatelessWidget {
  const _MenuItem(this.icon, this.label, this.onTap);
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: const Color(0xFF0A8920)),
      title: Text(label),
      trailing: const Icon(Icons.chevron_right, color: Color(0xFF90A3A3)),
      onTap: onTap,
    );
  }
}
