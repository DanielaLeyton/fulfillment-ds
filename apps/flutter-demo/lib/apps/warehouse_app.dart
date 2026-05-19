import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';
import '../screens/warehouse/shipping_home.dart';
import '../screens/warehouse/conductores_screen.dart';
import '../screens/warehouse/rutas_screen.dart';
import '../screens/warehouse/profile_screen.dart';

class WarehouseApp extends StatelessWidget {
  const WarehouseApp({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Shipping',
      theme: FdsTheme.brandA,
      debugShowCheckedModeBanner: false,
      home: WarehouseShell(onSwitchBrand: onSwitchBrand),
    );
  }
}

class WarehouseShell extends StatefulWidget {
  const WarehouseShell({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  State<WarehouseShell> createState() => _WarehouseShellState();
}

class _WarehouseShellState extends State<WarehouseShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      const ShippingHomeScreen(),
      const RutasScreen(),
      const ConductoresScreen(),
      ProfileScreen(onSwitchBrand: widget.onSwitchBrand),
    ];

    return Scaffold(
      body: screens[_tab],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _tab,
        onTap: (i) => setState(() => _tab = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_outlined), activeIcon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.route_outlined), activeIcon: Icon(Icons.route), label: 'Rutas'),
          BottomNavigationBarItem(icon: Icon(Icons.people_outline), activeIcon: Icon(Icons.people), label: 'Conductores'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Perfil'),
        ],
      ),
    );
  }
}
