import { Card, Text, Flex, Box, Heading, IconButton, Button, CloseButton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "environment";
import axios from "axios";
import { HSeparator } from "components/separator/Separator";
import { formatDate } from "utils/dateUtils";
import AllPurchaseItemsTableComponent from "./AllPurchasesItemsTableComponent";

const InventoryAdjustmentComponent = () => {
    const { id } = useParams();
    const [adjustment, setAdjustment] = useState({
        id: "",
        type:"",
        createdAt:"",
        items: [],
    });

    useEffect(() => {
        if (id) {
            axios
                .get(apiBaseUrl + `/api/Purchases/GetVendorById=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setAdjustment({
                            id,
                            createdAt:data.createdAt,
                            type:data.type,
                            items: data.items,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

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
                  Vendor Details
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/purchases/`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Adjusted By</StatLabel>
                                <StatNumber>{"--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Created Time</StatLabel>
                                <StatNumber>{adjustment.createdAt ? formatDate(adjustment.createdAt, true) : "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" flexDirection="column">
                        <Text fontSize="lg" mb="18px">
                            ITEM DETAILS
                        </Text>
                        {adjustment.items.length && <AllPurchaseItemsTableComponent adjustmentType={adjustment.type as any} tableData={adjustment.items} />}
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default InventoryAdjustmentComponent;
