import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class ShippingHomeScreen extends StatelessWidget {
  const ShippingHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;
    const primary = Color(0xFF006DFF);
    const secondary = Color(0xFF0F3893);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FF),
      body: CustomScrollView(
        slivers: [
          // Header
          SliverAppBar(
            pinned: true,
            backgroundColor: secondary,
            foregroundColor: Colors.white,
            expandedHeight: 120,
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.fromLTRB(16, 0, 16, 14),
              title: Row(
                children: [
                  Container(
                    width: 28, height: 28,
                    decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), shape: BoxShape.circle),
                    child: const Icon(Icons.local_shipping, color: Colors.white, size: 15),
                  ),
                  const SizedBox(width: 8),
                  const Text('Shipping', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white)),
                  const Spacer(),
                  _BreadcrumbChip('Chile'),
                  const SizedBox(width: 6),
                  _BreadcrumbChip('Jumbo'),
                ],
              ),
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [secondary, primary],
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 48, 16, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('¡Hola, Diego!', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                      const SizedBox(height: 2),
                      Text('Transporte · Hoy ${DateTime.now().day}/${DateTime.now().month}',
                          style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 12)),
                    ],
                  ),
                ),
              ),
            ),
            actions: [
              IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () {}),
              const SizedBox(width: 4),
            ],
          ),

          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // KPI grid
                GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.6,
                  children: const [
                    _KpiCard('Conductores activos', '124', Icons.people, primary),
                    _KpiCard('Rutas hoy', '38', Icons.route, Color(0xFF047E48)),
                    _KpiCard('En tránsito', '87', Icons.local_shipping_outlined, Color(0xFFFBBF24)),
                    _KpiCard('Incidencias', '3', Icons.warning_amber_outlined, Color(0xFFD72A22)),
                  ],
                ),
                const SizedBox(height: 20),

                // Breadcrumb nav
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Row(children: [
                    const Icon(Icons.local_shipping_outlined, size: 14, color: primary),
                    const SizedBox(width: 6),
                    Text('Shipping', style: TextStyle(color: primary, fontSize: 12, fontWeight: FontWeight.w600)),
                    Icon(Icons.chevron_right, size: 14, color: Colors.grey.shade400),
                    Text('Transporte', style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                    Icon(Icons.chevron_right, size: 14, color: Colors.grey.shade400),
                    Text('Dashboard', style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
                  ]),
                ),
                const SizedBox(height: 20),

                // Rutas recientes
                Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Text('Rutas de hoy', style: theme.textTheme.titleMedium),
                  TextButton(onPressed: () {}, child: const Text('Ver todas')),
                ]),
                const SizedBox(height: 10),
                _RouteCard(id: 'RT-001', driver: 'Francisco Aguayo', stops: 12, status: 'En ruta', statusColor: primary),
                const SizedBox(height: 8),
                _RouteCard(id: 'RT-002', driver: 'Ronald Vezga', stops: 8, status: 'En ruta', statusColor: primary),
                const SizedBox(height: 8),
                _RouteCard(id: 'RT-003', driver: 'Douglas Barraza', stops: 15, status: 'Disponible', statusColor: const Color(0xFF047E48)),
                const SizedBox(height: 20),

                // CTA
                FdsButton(
                  label: 'Ver todos los conductores',
                  fullWidth: true,
                  size: FdsButtonSize.lg,
                  leadingIcon: const Icon(Icons.people),
                  onPressed: () {},
                ),
                const SizedBox(height: 8),
                FdsButton(
                  label: 'Crear nueva ruta',
                  variant: FdsButtonVariant.ghost,
                  fullWidth: true,
                  onPressed: () {},
                ),
                const SizedBox(height: 20),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _BreadcrumbChip extends StatelessWidget {
  const _BreadcrumbChip(this.label);
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.2),
        borderRadius: BorderRadius.circular(9999),
      ),
      child: Text(label, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w600)),
    );
  }
}

class _KpiCard extends StatelessWidget {
  const _KpiCard(this.label, this.value, this.icon, this.color);
  final String label, value;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(children: [
            Icon(icon, color: color, size: 18),
            const Spacer(),
            Text(value, style: TextStyle(color: color, fontSize: 22, fontWeight: FontWeight.w800)),
          ]),
          Text(label, style: const TextStyle(color: Color(0xFF63767A), fontSize: 11)),
        ],
      ),
    );
  }
}

class _RouteCard extends StatelessWidget {
  const _RouteCard({required this.id, required this.driver, required this.stops, required this.status, required this.statusColor});
  final String id, driver, status;
  final int stops;
  final Color statusColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(color: statusColor.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
          child: Icon(Icons.route, color: statusColor, size: 18),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(id, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: Color(0xFF0E2B69))),
          Text(driver, style: const TextStyle(fontSize: 12, color: Color(0xFF37474F))),
          Text('$stops paradas', style: const TextStyle(fontSize: 11, color: Color(0xFF63767A))),
        ])),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(color: statusColor.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Container(width: 6, height: 6, decoration: BoxDecoration(color: statusColor, shape: BoxShape.circle)),
            const SizedBox(width: 4),
            Text(status, style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.w600)),
          ]),
        ),
      ]),
    );
  }
}
