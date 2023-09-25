import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Link, SimpleGrid } from "@chakra-ui/react";
import ItemsTableComponent from "./ItemsTableComponent";
import axios from "axios";
import { apiBaseUrl } from "environment";
import { MdAdd } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const ItemsComponent = () => {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        axios
            .get(apiBaseUrl + "Inventory/GetAllItems?PageIndex=1&PageSize=50")
            .then((response) => {
                if (response.data && response.data.data) {
                    setTableData(response.data.data.items);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "80px" }}
                my="0px"
                h="fit-content"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "flex-end",
                    xl: "flex-end",
                }}
                gap="20px"
            >
                <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/new`}>
                    <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                        Add
                    </Button>
                </ChakraLink>
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {tableData && <ItemsTableComponent tableData={tableData} />}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default ItemsComponent;
