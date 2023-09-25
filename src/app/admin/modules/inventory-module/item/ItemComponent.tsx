import { Card, Text, Flex, Box, Heading, IconButton, Button, CloseButton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "environment";
import axios from "axios";
import { HSeparator } from "components/separator/Separator";

const ItemComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const [item, setItem] = useState({
        id: "",
        name: "",
        description: "",
        sku: "",
        sellingPrice: 0,
        sellingDescription: "",
        costPrice: 0,
        costDescription: "",
        openingStock: 0,
        openingStockRatePerUnit: 0,
        reorderPoint: 0,
        unit: "Pcs",
    });

    useEffect(() => {
        if (id) {
            axios
                .get(apiBaseUrl + `Inventory/GetItemById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setItem({
                            id,
                            name: data.name,
                            description: data.description,
                            sku: data.sku,
                            sellingPrice: data.sellingPrice,
                            sellingDescription: data.sellingDescription,
                            costPrice: data.costPrice,
                            costDescription: data.costDescription,
                            openingStock: data.openingStock,
                            openingStockRatePerUnit: data.openingStockRatePerUnit,
                            reorderPoint: data.reorderPoint,
                            unit: data.unit,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const gotoAdjustStock = () => {
        navigate(`/admin/modules/inventory/items/${id}/inventory-adjustment`, { state: { itemName: item.name } });
    };

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "130px" }}
                my="0px"
                h="fit-content"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    {item.name}
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <Button variant="brand" onClick={gotoAdjustStock}>
                        Adjust Stock
                    </Button>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>SKU</StatLabel>
                                <StatNumber>{item.sku || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Unit</StatLabel>
                                <StatNumber>{item.unit || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Description</StatLabel>
                                <StatNumber>{item.description || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Opening Stock</StatLabel>
                                <StatNumber>{item.openingStock}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Opening Stock Rate per Unit</StatLabel>
                                <StatNumber>{item.openingStockRatePerUnit}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Reorder Point</StatLabel>
                                <StatNumber>{item.reorderPoint}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px">
                        <Box w="45%">
                            <Text fontSize="lg" mb="18px">
                                Sales Information
                            </Text>

                            <Flex direction="column">
                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Selling Price</StatLabel>
                                    <StatNumber>{item.sellingPrice}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Selling Price Description</StatLabel>
                                    <StatNumber>{item.sellingDescription || "--"}</StatNumber>
                                </Stat>
                            </Flex>
                        </Box>
                        <Box w="40%">
                            <Text fontSize="lg" mb="18px">
                                Purchase Information
                            </Text>

                            <Flex direction="column">
                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Cost Price</StatLabel>
                                    <StatNumber>{item.costPrice}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Cost Price Description</StatLabel>
                                    <StatNumber>{item.costDescription || "--"}</StatNumber>
                                </Stat>
                            </Flex>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default ItemComponent;
