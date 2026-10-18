import 'package:flutter/material.dart';

import '../cart/cart_scope.dart';
import '../data/product_repository.dart';
import '../models/product.dart';
import '../widgets/product_card.dart';

class ProductListPage extends StatefulWidget {
  final String? initialCategory;

  const ProductListPage({super.key, this.initialCategory});

  @override
  State<ProductListPage> createState() => _ProductListPageState();
}

class _ProductListPageState extends State<ProductListPage> {
  final _repository = ProductRepository();
  final _searchController = TextEditingController();
  List<Product> _all = [];
  String _query = '';
  String? _category;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _category = widget.initialCategory;
    _load();
  }

  Future<void> _load() async {
    final products = await _repository.loadProducts();
    setState(() {
      _all = products;
      _loading = false;
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<Product> get _visible {
    return _all.where((product) {
      final matchesQuery = product.name.toLowerCase().contains(_query);
      final matchesCategory = _category == null || product.category == _category;
      return matchesQuery && matchesCategory;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final cart = CartScope.of(context);
    final categories = <String>{for (final item in _all) item.category}.toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Urunler'),
        actions: [
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/cart'),
            icon: Badge(
              isLabelVisible: cart.count > 0,
              label: Text('${cart.count}'),
              child: const Icon(Icons.shopping_bag_outlined),
            ),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                  child: TextField(
                    controller: _searchController,
                    decoration: const InputDecoration(
                      hintText: 'Ara (iphone, watch...)',
                      prefixIcon: Icon(Icons.search),
                      border: OutlineInputBorder(),
                      isDense: true,
                    ),
                    onChanged: (value) {
                      setState(() {
                        _query = value.toLowerCase().trim();
                      });
                    },
                  ),
                ),
                SizedBox(
                  height: 44,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: FilterChip(
                          label: const Text('Tumu'),
                          selected: _category == null,
                          onSelected: (_) {
                            setState(() {
                              _category = null;
                            });
                          },
                        ),
                      ),
                      ...categories.map(
                        (category) => Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: FilterChip(
                            label: Text(category),
                            selected: _category == category,
                            onSelected: (_) {
                              setState(() {
                                _category = category;
                              });
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: _visible.isEmpty
                      ? const Center(child: Text('Urun yok.'))
                      : GridView.builder(
                          padding: const EdgeInsets.all(12),
                          itemCount: _visible.length,
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            childAspectRatio: 0.72,
                            crossAxisSpacing: 8,
                            mainAxisSpacing: 8,
                          ),
                          itemBuilder: (context, index) {
                            final product = _visible[index];
                            return ProductCard(
                              product: product,
                              onTap: () {
                                Navigator.pushNamed(
                                  context,
                                  '/detail',
                                  arguments: product,
                                );
                              },
                            );
                          },
                        ),
                ),
              ],
            ),
    );
  }
}
