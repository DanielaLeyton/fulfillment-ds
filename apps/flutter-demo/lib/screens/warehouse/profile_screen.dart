import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  static const primary = Color(0xFF006DFF);
  static const secondary = Color(0xFF0F3893);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FF),
      appBar: AppBar(backgroundColor: secondary, foregroundColor: Colors.white, title: const Text('Mi cuenta')),
      body: SingleChildScrollView(
        child: Column(children: [
          // Header
          Container(
            width: double.infinity,
            decoration: const BoxDecoration(
              gradient: LinearGradient(colors: [secondary, primary], begin: Alignment.topLeft, end: Alignment.bottomRight),
            ),
            padding: const EdgeInsets.symmetric(vertical: 32),
            child: Column(children: [
              CircleAvatar(
                radius: 36,
                backgroundColor: Colors.white.withOpacity(0.2),
                child: const Text('DG', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800)),
              ),
              const SizedBox(height: 12),
              const Text('Diego González', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text('Supervisor · Shipping', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 13)),
              const SizedBox(height: 12),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                _HeaderChip('Chile'),
                const SizedBox(width: 8),
                _HeaderChip('Jumbo'),
                const SizedBox(width: 8),
                _HeaderChip('ESP'),
              ]),
            ]),
          ),

          // Stats
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(children: [
              Expanded(child: _Stat('Conductores', '124')),
              Expanded(child: _Stat('Rutas hoy', '38')),
              Expanded(child: _Stat('Completadas', '36')),
            ]),
          ),
          const Divider(),

          _MenuItem(Icons.route_outlined, 'Gestión de rutas', () {}),
          _MenuItem(Icons.people_outline, 'Conductores', () {}),
          _MenuItem(Icons.local_shipping_outlined, 'Vehículos', () {}),
          _MenuItem(Icons.bar_chart_outlined, 'Reportes', () {}),
          _MenuItem(Icons.settings_outlined, 'Configuración', () {}),
          const Divider(),

          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Design System', style: theme.textTheme.titleSmall),
              const SizedBox(height: 4),
              const Text('Brand A — Shipping (Cencosud)', style: TextStyle(fontSize: 12, color: Color(0xFF63767A))),
              const SizedBox(height: 12),
              FdsButton(
                label: 'Cambiar a Brand B (Jumbo Delivery)',
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

class _HeaderChip extends StatelessWidget {
  const _HeaderChip(this.label);
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(9999)),
      child: Text(label, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600)),
    );
  }
}

class _Stat extends StatelessWidget {
  const _Stat(this.label, this.value);
  final String label, value;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Color(0xFF006DFF))),
      const SizedBox(height: 2),
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
      leading: Icon(icon, color: const Color(0xFF006DFF)),
      title: Text(label),
      trailing: const Icon(Icons.chevron_right, color: Color(0xFF90A3A3)),
      onTap: onTap,
    );
  }
}
