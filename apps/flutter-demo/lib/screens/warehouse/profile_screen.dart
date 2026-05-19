import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key, required this.onSwitchBrand});
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
                CircleAvatar(radius: 36, backgroundColor: cs.primary, child: const Text('CG', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w700))),
                const SizedBox(height: 12),
                const Text('Carlos García', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                Text('Operario · Zona B', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 13)),
              ]),
            ),

            // Stats row
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(children: [
                Expanded(child: _Stat('Turno', '08:00–16:00')),
                Expanded(child: _Stat('Completadas hoy', '87')),
                Expanded(child: _Stat('Eficiencia', '94%')),
              ]),
            ),
            const Divider(),

            // Menu items
            _MenuItem(Icons.history, 'Historial de tareas', () {}),
            _MenuItem(Icons.bar_chart_outlined, 'Mis métricas', () {}),
            _MenuItem(Icons.notifications_outlined, 'Notificaciones', () {}),
            _MenuItem(Icons.help_outline, 'Ayuda', () {}),
            const Divider(),

            // Brand switcher
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Design System', style: theme.textTheme.titleSmall),
                  const SizedBox(height: 4),
                  Text('Brand actual: Brand A — Warehouse Ops', style: theme.textTheme.bodySmall),
                  const SizedBox(height: 12),
                  FdsButton(
                    label: 'Cambiar a Brand B (Last Mile)',
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

class _Stat extends StatelessWidget {
  const _Stat(this.label, this.value);
  final String label, value;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(children: [
      Text(value, style: theme.textTheme.titleLarge),
      const SizedBox(height: 2),
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
