import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class DeliveryProfileScreen extends StatelessWidget {
  const DeliveryProfileScreen({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(title: const Text('Perfil')),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header
            Container(
              width: double.infinity,
              color: cs.secondary,
              padding: const EdgeInsets.symmetric(vertical: 32),
              child: Column(children: [
                CircleAvatar(radius: 36, backgroundColor: cs.primary, child: const Text('ML', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w700))),
                const SizedBox(height: 12),
                const Text('Miguel López', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                Text('Repartidor · Zona Norte', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 13)),
              ]),
            ),

            // Daily stats
            Padding(
              padding: const EdgeInsets.all(16),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text('Resumen de hoy', style: theme.textTheme.titleMedium),
                    const SizedBox(height: 12),
                    Row(children: [
                      Expanded(child: _Metric('Entregados', '8', cs.primary)),
                      Expanded(child: _Metric('Pendientes', '4', const Color(0xFFFBBF24))),
                      Expanded(child: _Metric('Km recorridos', '32', const Color(0xFF63767A))),
                    ]),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: 8 / 12,
                        minHeight: 8,
                        backgroundColor: const Color(0xFFE7EBEA),
                        valueColor: AlwaysStoppedAnimation(cs.primary),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text('8 de 12 entregas completadas (66%)', style: theme.textTheme.labelSmall),
                  ]),
                ),
              ),
            ),

            // Menu
            _MenuItem(Icons.history, 'Historial de entregas', () {}),
            _MenuItem(Icons.star_outline, 'Calificaciones', () {}),
            _MenuItem(Icons.account_balance_wallet_outlined, 'Mis ganancias', () {}),
            _MenuItem(Icons.directions_car_outlined, 'Mi vehículo', () {}),
            _MenuItem(Icons.help_outline, 'Soporte', () {}),
            const Divider(),

            // Brand switcher
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Design System', style: theme.textTheme.titleSmall),
                  const SizedBox(height: 4),
                  Text('Brand actual: Brand B — Last Mile', style: theme.textTheme.bodySmall),
                  const SizedBox(height: 12),
                  FdsButton(
                    label: 'Cambiar a Brand A (Warehouse)',
                    variant: FdsButtonVariant.especial,
                    fullWidth: true,
                    leadingIcon: const Icon(Icons.swap_horiz),
                    onPressed: onSwitchBrand,
                  ),
                ],
              ),
            ),
          ],
        ),
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
    final theme = Theme.of(context);
    return Column(children: [
      Text(value, style: theme.textTheme.titleLarge?.copyWith(color: color, fontSize: 22)),
      Text(label, style: theme.textTheme.labelSmall, textAlign: TextAlign.center),
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
      leading: Icon(icon, color: Theme.of(context).colorScheme.primary),
      title: Text(label),
      trailing: const Icon(Icons.chevron_right, color: Color(0xFF90A3A3)),
      onTap: onTap,
    );
  }
}
