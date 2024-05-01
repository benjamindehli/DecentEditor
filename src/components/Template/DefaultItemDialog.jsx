// Dependencies
import { useContext, useState } from "react";

// Material UI
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Components
import { XmlPreview } from "@/components/Template/XmlPreview";
import { TabPanel } from "@/components/Template/TabPanel";

// Functions
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function DefaultItemDialog({
    elementItem,
    previewItem,
    dialogIcon,
    dialogTitle,
    contentHeight,
    tabs,
    open,
    onClose
}) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const theme = useTheme();

    const [previewXmlCode, setPreviewXmlCode] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    function handleOnClose() {
        onClose();
        setTimeout(() => {
            setPreviewXmlCode(false);
            setSelectedTab(0);
        }, 500);
    }

    function a11yProps(index) {
        return {
            id: `tab-${index}`,
            "aria-controls": `tabpanel-${index}`
        };
    }

    function handleTogglePreviewXmlCode() {
        setPreviewXmlCode(!previewXmlCode);
    }

    const elementColor = getColorForElementType(elementItem?.elementType)[theme.palette.mode];

    return (
        open && (
            <Dialog
                open={open}
                onClose={handleOnClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        Object.keys(previewItem).forEach((key) => {
                            elementItem[key] = previewItem[key];
                        });
                        handleOnClose();
                    }
                }}
            >
                <DialogTitle>
                    {dialogIcon} {dialogTitle}
                </DialogTitle>

                {tabs.length > 1 && !previewXmlCode && (
                    <AppBar position="static">
                        <Tabs
                            value={selectedTab}
                            centered
                            textColor="inherit"
                            variant="fullWidth"
                            onChange={handleTabChange}
                            TabIndicatorProps={{
                                sx: { backgroundColor: elementColor }
                            }}
                            aria-label={`tabs for editing ${elementItem.elementType}`}
                        >
                            {tabs.map((tab, index) => (
                                <Tab key={index} icon={tab.icon} label={tab.label} {...a11yProps(0)} />
                            ))}
                        </Tabs>
                    </AppBar>
                )}

                {previewXmlCode ? (
                    <DialogContent
                        sx={{
                            height: contentHeight || "auto",
                            width: "600px",
                            px: 0,
                            backgroundColor: theme.palette.background.default
                        }}
                    >
                        <XmlPreview
                            xmlString={previewItem?.toXml(decentSamplerContext?.decentSampler, true)}
                            wrapText
                        />
                    </DialogContent>
                ) : (
                    <DialogContent sx={{ height: contentHeight || "auto", width: "600px" }}>
                        {tabs.length > 1
                            ? tabs.map((tab, index) => {
                                  return (
                                      <TabPanel key={index} value={selectedTab} index={index}>
                                          {tab.children}
                                      </TabPanel>
                                  );
                              })
                            : tabs[0].children}
                    </DialogContent>
                )}

                <DialogActions>
                    <Button onClick={handleOnClose}>Cancel</Button>
                    <Button onClick={handleTogglePreviewXmlCode}>
                        {previewXmlCode ? "Edit values" : "Preview code"}
                    </Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        )
    );
}
